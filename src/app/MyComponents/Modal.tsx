"use client"

import { useMyContext } from '../context/ModalContext'
import { addTask, UpdateTask } from '@/action/task.action'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

const Modal = function () {
    const { setIsOpen, ModalData, setModalData, EditMode } = useMyContext();

    const handleFormAction = async (formData:FormData) => {

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        if (!EditMode) {
            await addTask({ title, description });
           window.location.reload();
        } else {
            if (ModalData?.id !== null && ModalData?.id !== undefined) {
                await UpdateTask({ id: ModalData.id, title, description });
                window.location.reload();
            } else {
                alert("There is an error");
                return;
            }
        }

        setIsOpen(false);
    };

    return (
        <Dialog open={true} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{EditMode ? 'Edit Task' : 'Add Task'}</DialogTitle>
                    <DialogDescription>
                        {EditMode ? 'You can update your task details here.' : 'Fill the form to add a new task.'}
                    </DialogDescription>
                </DialogHeader>

                <form action={handleFormAction} className="space-y-4 mt-2">
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

                    <div className="flex justify-end space-x-2 mt-4">
                        <Button type="button" className='cursor-pointer hover:bg-red-800 text-white bg-red-900' onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button className='dark:bg-blue-950 dark:hover:bg-blue-900 bg-orange-800 hover:bg-orange-700 cursor-pointer text-white' type="submit">
                            {EditMode ? 'Update Task' : 'Add Task'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default Modal;
