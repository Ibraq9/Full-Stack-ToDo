"use client"

import { useMyContext } from '../context/ModalContext'
import { addTask, deleteTask, UpdateTask } from '../../action/task.action'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../../components/ui/dialog"
import { Button } from '../../components/ui/button'

const Modal = function () {
    const { setIsOpen, ModalData, setModalData, EditMode, Isdelete } = useMyContext();

    const handleFormAction = async (formData: FormData) => {

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        if (!EditMode) {
            await addTask({ title, description });
            window.location.reload();
        } else if (EditMode) {
            if (ModalData?.id !== null && ModalData?.id !== undefined) {
                await UpdateTask({ id: ModalData.id, title, description });
                window.location.reload();
            } else {
                alert("There is an error");
                return;
            }
        } else {
            if (ModalData?.id !== null && ModalData?.id !== undefined) {
                await deleteTask(ModalData.id)
                window.location.reload()
            } else {
                alert('there is an error when delete Task')
            }
        }

        setIsOpen(false);
    };

    return (
        <Dialog open={true} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{EditMode ? 'Edit Task' : Isdelete ? 'Delete Task' : 'Add New Task'}</DialogTitle>
                    <DialogDescription>
                        {EditMode ? 'You can update your task details here.' : Isdelete ? 'Are you sure?' : 'Fill Inputs feild'}
                    </DialogDescription>
                </DialogHeader>


                <form action={handleFormAction} className="space-y-4 mt-2">
                    {!Isdelete && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
                            <input
                                name="title"
                                type="text"
                                value={ModalData?.title || ''}
                                onChange={(e) =>
                                    setModalData((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                required
                                placeholder="Enter task title"
                                className="w-full p-2 border border-gray-300 rounded-md text-black dark:text-white"
                            />
                        </div>
                    )}

                    {!Isdelete && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Description (Optional)</label>
                            <input
                                name="description"
                                type="text"
                                value={ModalData?.description || ''}
                                onChange={(e) =>
                                    setModalData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Enter task description"
                                className="w-full p-2 border border-gray-300 rounded-md text-black dark:text-white"
                            />
                        </div>
                    )}

                    <div className="flex justify-end space-x-2 mt-4">
                        <Button className={`${Isdelete ? 'bg-red-800 hover:bg-red-700' : 'dark:hover:bg-blue-900 dark:bg-blue-950 bg-orange-800 hover:bg-orange-700'}   cursor-pointer text-white`} type="submit">
                            {EditMode ? 'Update Task' : Isdelete ? 'Delete' : 'Add Task'}
                        </Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    );
}

export default Modal;
