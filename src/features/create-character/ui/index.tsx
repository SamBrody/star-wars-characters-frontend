import {useCreateCharacter} from "../api/use-create-character.ts";
import {useSnackbar} from "notistack";
import {
    BirthDayEra,
    CharacterBirthday,
    CharacterCard,
    CharacterGender,
    CreateCharacter,
    CreateCharacterErrorKeys
} from "../../../entities/character";
import {useNavigate} from "@tanstack/react-router";
import {DefaultValues, FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {SelectOptionType} from "../../../shared";
import {useEffect} from "react";

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

export const CreateCharacterForm = () => {
    const snackbar = useSnackbar();

    const navigate = useNavigate();

    const methods = useForm<FormValues>({defaultValues: defValues});

    const handleCreateSuccess = () => {
        const msg = 'Персонаж был успешно создан';
        snackbar.enqueueSnackbar(msg, {variant: 'success'});
    }

    const handleCreateError = (error: Record<CreateCharacterErrorKeys, string[]>) => {
        const msg = 'Произошла ошибка при создании!';
        snackbar.enqueueSnackbar(`${msg}`, {variant: 'error'});

        Object.keys(error).forEach(key => {
            if (key === "birthDay.Year") {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                methods.setError("birthYear", {message: error[key][0]});
                return;
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            methods.setError(key, { message: error[key][0]});
        })
    }

    const {mutate, isSuccess} = useCreateCharacter(handleCreateSuccess, handleCreateError);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const birthDay: CharacterBirthday = {
            year: data.birthYear as number,
            era: data.birthEra?.value ? Number(data.birthEra.value) : BirthDayEra.BBY,
        }

        const character: CreateCharacter = {
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

    useEffect(() => {
        isSuccess && navigate({to: '/characters'});
    }, [isSuccess]);

    return(
        <FormProvider {...methods}>
            <CharacterCard
                title="Добавление персонажа"
                actionBtnText="Отменить"
                onSubmit={methods.handleSubmit(onSubmit)}
                onAction={() => navigate({to: '/characters'})}
            />
        </FormProvider>
    )
}