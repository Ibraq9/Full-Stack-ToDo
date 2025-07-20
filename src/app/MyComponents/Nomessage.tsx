import React from 'react';
import { ClipboardList } from 'lucide-react'; // لو تستخدم Lucide Icons

const NoTaskMessage = () => {
  return (
    <div className=" flex flex-col items-center justify-center mt-16 text-center text-gray-600 px-4">
      <ClipboardList size={48} className="text-blue-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">No Tasks Found</h2>
      <p className="text-base max-w-md">
        You haven't added any tasks yet. Start by clicking the Add button and manage your day effectively.
      </p>
    </div>
  );
};

export default NoTaskMessage;
