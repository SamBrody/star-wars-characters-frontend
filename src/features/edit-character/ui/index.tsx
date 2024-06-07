import {SelectOptionType} from "../../../shared";
import {useSnackbar} from "notistack";
import {useNavigate, useParams} from "@tanstack/react-router";
import {
    BirthDayEra,
    Character,
    CharacterBirthday,
    CharacterCard,
    CharacterGender,
    eraOptions,
    genderOptions,
    UpdateCharacter,
    UpdateCharacterErrorKeys,
    useGetDetailCharacter
} from "../../../entities/character";
import {DefaultValues, FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {useUpdateCharacter} from "../api/use-update-character.ts";
import {useEffect, useState} from "react";
import {CharacterDeleteModal} from "../../delete-character";
import {Spinner} from "react-bootstrap";

type FormValues = {
    name: string,
    originalName: string,
    birthYear: number | string,
    birthEra: SelectOptionType | undefined,
    planets: SelectOptionType| undefined,
    gender: SelectOptionType| undefined,
    species: SelectOptionType | undefined,
    height: number | string,
    hairColor: string,
    eyeColor: string,
    description: string,
    movies: SelectOptionType[]
}

const defValues: DefaultValues<FormValues> = {
    name: '',
    originalName: '',
    birthYear: '',
    birthEra: undefined,
    planets: undefined,
    gender: undefined,
    species: undefined,
    height: '',
    hairColor: '',
    eyeColor: '',
    description: '',
    movies: [],
}

const mapToFormValues = (character: Character | undefined) => {
    if (character === undefined) return defValues;

    const movies = character.movies.map(x => {
        const movie: SelectOptionType = {
            value: x.id.toString(),
            label: x.name,
        }

        return movie;
    })

    const value: FormValues = {
        name: character.name,
        originalName: character.originalName,
        birthYear: character.birthDay.year,
        birthEra: eraOptions.find(x => Number(x.value) === character.birthDay.era ),
        planets: {value: character.homeWorld.id.toString(), label: character.homeWorld.name},
        gender: genderOptions.find(x => Number(x.value) === character.gender ),
        species: {value: character.species.id.toString(), label: character.species.name},
        height: character.height,
        hairColor: character.hairColor,
        eyeColor: character.eyeColor,
        description: character.description,
        movies: movies
    }

    return value;
}

export const UpdateCharacterForm = () => {
    const characterId = useParams({
        from: '/characters/$characterId/edit',
        select: (params) => params.characterId,
    });
    const snackbar = useSnackbar();

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const {
        data: character,
        isSuccess,
        isFetching,
        isLoading
    } = useGetDetailCharacter(characterId);

    const handleUpdateSuccess = () => {
        const msg = 'Персонаж был успешно обновлен';
        snackbar.enqueueSnackbar(msg, {variant: 'success'});
    }

    const handleUpdateError = (error: Record<UpdateCharacterErrorKeys, string[]>) => {
        const msg = 'Произошла ошибка при обновлении!';
        snackbar.enqueueSnackbar(`${msg}`, {variant: 'error'});

        Object.keys(error).forEach(key => {
            if (key === "birthDay.Year") {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                methods.setError("birthYear", {message: error[key][0]});
                return;
            }

            if (key === "generalErrors") {
                snackbar.enqueueSnackbar(`${error[key][0]}`, {variant: 'error'});
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            methods.setError(key, { message: error[key][0]});
        })
    }

    const {
        mutate,
        isPending,
    } = useUpdateCharacter(handleUpdateSuccess, handleUpdateError);

    const methods = useForm<FormValues>({defaultValues: defValues});

    useEffect(() => {
        methods.reset(mapToFormValues(character));
    }, [isSuccess]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const birthDay: CharacterBirthday = {
            year: data.birthYear as number,
            era: data.birthEra?.value ? Number(data.birthEra.value) : BirthDayEra.BBY,
        }

        const character: UpdateCharacter = {
            id: characterId,
            name: data.name,
            originalName: data.originalName,
            birthDay: birthDay,
            planetId: Number(data.planets?.value),
            gender: Number(data.gender?.value) === 0 ? CharacterGender.male : CharacterGender.female,
            speciesId: Number(data.species?.value),
            height: Number(data.height),
            hairColor: data.hairColor,
            eyeColor: data.eyeColor,
            description: data.description,
            movieIds: data.movies.map(x => Number(x.value)),
        }

        mutate(character);
    }

    const title = `Редактировать персонажа ${methods.getValues('name')}`;

    const isLoadingOrFetching = (isFetching || isLoading);

    return(
        <FormProvider {...methods}>
            {isLoadingOrFetching && <Spinner animation="border"/>}
            {isPending && <Spinner animation="border"/>}
            {!isLoadingOrFetching && isSuccess && <CharacterCard
                title={title}
                actionBtnText="Удалить"
                onSubmit={methods.handleSubmit(onSubmit)}
                onAction={() => setShowModal(true)}
            />}
            <CharacterDeleteModal
                characterId={characterId}
                show={showModal}
                handleSubmit={() => navigate({to: '/characters'})}
                handleClose={() => setShowModal(false)}
            />
        </FormProvider>
    )
}