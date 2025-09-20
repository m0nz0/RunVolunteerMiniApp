import {useState} from "react";
import {Button, Modal} from "react-bootstrap";

interface ConfirmOptions {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}

export function useConfirmModal() {
    const [show, setShow] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({});
    const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

    const confirm = (opts: ConfirmOptions, onYes: () => void) => {
        setOptions(opts);
        setOnConfirm(() => onYes);
        setShow(true);
    };

    const handleClose = () => setShow(false);
    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        setShow(false);
    };

    const ConfirmModal = (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{options.title ?? "Подтверждение"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{options.message ?? "Вы уверены?"}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {options.cancelText ?? "Отмена"}
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    {options.confirmText ?? "Да"}
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return {confirm, ConfirmModal};
}
