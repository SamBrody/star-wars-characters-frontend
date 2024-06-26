import {Button, Modal} from "react-bootstrap";
import {useSnackbar} from "notistack";
import {useEffect} from "react";
import {useDeleteCharacter} from "../api/use-delete-character.ts";
import {DeleteCharacterErrorKeys} from "../../../entities/character";

type Props = {
    characterId: number,
    show: boolean,
    handleSubmit: () => void,
    handleClose: () => void,
}

export const CharacterDeleteModal = ({characterId, show, handleSubmit, handleClose}: Props) => {
    const snackbar = useSnackbar();

    const handleDeleteSuccess = () => {
        const msg = 'Персонаж был успешно удален';
        snackbar.enqueueSnackbar(msg, {variant: 'success'});
    }

    const handleDeleteError = (error: Record<DeleteCharacterErrorKeys, string[]>) => {
        const msg = `Произошла ошибка: ${error.generalErrors}`;
        snackbar.enqueueSnackbar(msg, {variant: 'error'});
    }

    const {
        mutate,
        isSuccess,
    } = useDeleteCharacter(handleDeleteSuccess, handleDeleteError);

    const onSubmitClick = () => mutate(characterId);

    useEffect(() => {
        isSuccess && handleSubmit();
        isSuccess && handleClose();
    }, [isSuccess]);

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Подтверждение действия</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы действительно хотите удалить персонажа?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="secondary" onClick={onSubmitClick}>
                    Подтвердить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}