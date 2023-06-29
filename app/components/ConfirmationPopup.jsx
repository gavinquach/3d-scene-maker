import { memo } from "react";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-4 rounded shadow-lg">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button className="mr-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(ConfirmationPopup);
