'use client';
import UserInputForm from '../components/database/flashcard-input-form';
import { use } from 'react';

export default function WordInput() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <UserInputForm />
    </div>
  );
}
