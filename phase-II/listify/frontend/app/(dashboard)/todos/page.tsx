import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import TodoClient from './todo-client';

const TodosPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return <TodoClient />
}

export default TodosPage
