'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createResource } from '@/services/resource.service';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

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

export default function AddResourcePage() {
  useAuthGuard();

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

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createResource(data),

    onSuccess: () => {
      toast.success('Resource created successfully!');
      reset();
    },

    onError: (err) => {
      toast.error(err?.message || 'Failed to create resource');
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

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-sky-500">Add Resource</h1>
        <p className="text-gray-500 mt-2">
          Share your study materials with everyone.
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
              <label className="block mb-2 font-medium">
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
              <label className="block mb-2 font-medium">
                Description *
              </label>

              <textarea
                rows={5}
                className="w-full border rounded-xl p-3"
                placeholder="Write resource description..."
                {...register('description', {
                  required: 'Description is required',
                })}
              />

              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category */}

            <div>
              <label className="block mb-2 font-medium">
                Category *
              </label>

              <select
                className="w-full border rounded-xl p-3"
                {...register('category', {
                  required: 'Category is required',
                })}
              >
                <option value="">Select Category</option>

                {CATEGORIES.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Level */}

            <div>
              <label className="block mb-2 font-medium">
                Level *
              </label>

              <select
                className="w-full border rounded-xl p-3"
                {...register('level', {
                  required: 'Level is required',
                })}
              >
                <option value="">Select Level</option>

                {LEVELS.map((level) => (
                  <option
                    key={level}
                    value={level}
                  >
                    {level}
                  </option>
                ))}
              </select>

              {errors.level && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.level.message}
                </p>
              )}
            </div>

            {/* Tags */}

            <div>
              <label className="block mb-2 font-medium">
                Tags
              </label>

              <Input
              className="text-white"
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
                ? 'Creating Resource...'
                : 'Create Resource'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}