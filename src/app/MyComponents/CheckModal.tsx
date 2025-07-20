"use client"

import React from 'react'
import Modal from './Modal';
import { useMyContext } from '../context/ModalContext';

const CheckModal = () => {
    const { isOpen } = useMyContext();
    return (
        <>
            {isOpen && <Modal />}
        </>
    )
}

export default CheckModal
