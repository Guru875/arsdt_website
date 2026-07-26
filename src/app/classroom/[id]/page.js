import { notFound } from 'next/navigation';
import coursesData from '@/data/courses.json';
import ClassroomClient from './ClassroomClient';

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id,
  }));
}

export default async function ClassroomPage({ params }) {
  const { id } = await params;
  const course = coursesData.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  return <ClassroomClient course={course} />;
}
