'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateResource, fetchResourceById } from '@/services/resource.service';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

const CATEGORIES = [
  'Computer Science',
  'Mathematics',
  'Physics & Astronomy',
  'Biology',
  'Chemistry',
  'Literature',
  'History',
  'Economics',
  'Languages',
  'Other',
];

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function EditResourcePage() {
  useAuthGuard();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      level: '',
      tags: '',
    },
  });

  const { data: resource, isLoading: isFetching } = useQuery({
    queryKey: ['resource', id],
    queryFn: () => fetchResourceById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (resource) {
      reset({
        title: resource.title || '',
        description: resource.description || '',
        category: resource.category || '',
        level: resource.level || '',
        tags: resource.tags ? resource.tags.join(', ') : '',
      });
    }
  }, [resource, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updateResource(id, data),

    onSuccess: () => {
      toast.success('Resource updated successfully!');
      router.push('/dashboard/manage-resources');
    },

    onError: (err) => {
      toast.error(err?.message || 'Failed to update resource');
    },
  });

  const onSubmit = (data) => {
    mutate({
      ...data,
      tags: data.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400">Edit Resource</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Update the details of your study material.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="mt-8 p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Title */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Title *
              </label>

              <Input
                placeholder="Resource title"
                {...register('title', {
                  required: 'Title is required',
                })}
              />

              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Description *
              </label>

              <Textarea
                rows={5}
                placeholder="Write resource description..."
                error={errors.description?.message}
                {...register('description', {
                  required: 'Description is required',
                })}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Category *
              </label>

              <Select
                error={errors.category?.message}
                {...register('category', {
                  required: 'Category is required',
                })}
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>

            {/* Level */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Level *
              </label>

              <Select
                error={errors.level?.message}
                {...register('level', {
                  required: 'Level is required',
                })}
              >
                <option value="">Select Level</option>
                {LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Select>
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Tags
              </label>

              <Input
                placeholder="react, javascript, notes"
                {...register('tags')}
              />

              <p className="text-sm text-gray-500 mt-1">
                Separate tags with commas.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2"
            >
              {isPending && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {isPending
                ? 'Updating Resource...'
                : 'Update Resource'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
