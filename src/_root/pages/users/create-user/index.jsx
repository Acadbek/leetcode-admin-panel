import React from 'react';
import { UserCreationForm } from './components/create-user-form';
// import { useCreateUser } from '@/hooks/queries/useUsers';

const CreateUserPage = () => {
  return (
    <div className='px-6'>
      <h1 className='text-3xl font-bold mb-6'>Create User</h1>
      <UserCreationForm/>
    </div>
  );
};

export default CreateUserPage;
