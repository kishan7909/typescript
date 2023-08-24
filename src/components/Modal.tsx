import React, { ReactElement, useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface PageProps {
    message?: string;
    setIsopen?: any;
    isOpen?: boolean;
    onYesClick: any;
    onNoClick?: any;
}
const ConfirmationModal: React.FC<PageProps> = ({
    isOpen,
    setIsopen,
    message,
    onYesClick = () => { },
    onNoClick = () => { }
}) => {
    // const [isOpen, setIsOpen] = useState(true);
    return (<>
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-3 mx-4 sm:mx-auto sm:max-w-md ">
                    <div className='flex items-center mb-2'>
                        <ExclamationCircleFilled style={{
                            color: "#faad14",
                            fontSize: "22px"
                        }} />
                        <p className=" ml-3 text-black font-semibold">{message}</p>
                    </div>
                    <div className='flex justify-end space-x-3'>
                        <button
                            className="bg-white border border-grey text-sm px-3 py-1 text-black  rounded min-w-[100px]"
                            onClick={() => {
                                setIsopen(false)
                                onNoClick()
                            }}
                        >
                            No
                        </button>
                        <button
                            className="bg-white border border-red-400 text-sm px-2 py-0 text-red-400 rounded min-w-[100px]"
                            onClick={onYesClick}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
    );
};

export default ConfirmationModal;
