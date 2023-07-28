import React from 'react';
import '@/styles/ConfirmModal.scss';

interface Props{
    closeModal: () => void,
    deleteQuestionConfirm: ()=> void
}

function ConfirmModal({closeModal,deleteQuestionConfirm}:Props) {
  return (
    <div className='confirm-modal-c'>
        <div className='confirm-modal'>
            <p>Do you really want to delete the question?</p>
            <div className='btn-c'>
                <button type='button'
                 className='btn btn-secondary'
                 style={{width:"120px"}}
                 onClick={closeModal}>
                    Cancel
                </button>
                <button type='button'
                 className='btn btn-danger'
                 onClick={deleteQuestionConfirm}>
                    Delete
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal