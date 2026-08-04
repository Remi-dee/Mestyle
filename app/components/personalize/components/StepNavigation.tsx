// components/StepNavigation.tsx
"use client";

import {
  goToStep,
  nextStep,
  selectPersona,
  resetForm,
} from "@/app/redux/features/persona/personaSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  useCreatePersonaMutation,
  useUpdatePersonaMutation,
  useActivatePersonaMutation,
} from "@/app/redux/features/persona/personaApi";
import { useRouter } from "next/navigation";
import FormError from "../../ui/form/FormError";
import Button from "../../ui/button/Button";



type Props = {
  steps: Array<{ label: string; component: React.ReactNode; validate: string }>;
  isEditMode?: boolean;
  personaId?: string;
};

export default function StepNavigation({
  steps,
  isEditMode = false,
  personaId,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { formStep, errors, formData } = useSelector(selectPersona);
  const [hasErrors, setHasErrors] = useState(false);

  // Mutations
  const [createPersona, { isLoading: isCreating }] = useCreatePersonaMutation();

  const [updatePersona, { isLoading: isUpdating }] = useUpdatePersonaMutation();
  const [activatePersona] = useActivatePersonaMutation();

  const [submitError, setSubmitError] = useState<string | null>(null);

  // Combined loading state
  const isLoading = isCreating || isUpdating;

  // Check if there are any validation errors
  useEffect(() => {
    setHasErrors(Object.keys(errors).length > 0);
  }, [errors]);

  const isLastStep = formStep === steps.length - 1;
  const isFirstStep = formStep === 0;

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handlePrev = () => {
    dispatch(goToStep(formStep - 1));
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    try {
      if (isEditMode && personaId) {
        await updatePersona({ id: personaId, personaData: formData }).unwrap();
      } else {
        // Create the persona, then make it active so the feed personalises to
        // it immediately (backend defaults new personas to isActive: false).
        const created = await createPersona(formData).unwrap();
        const newId = created?._id || created?.data?._id;
        if (newId) {
          await activatePersona(newId).unwrap();
        }
      }
      dispatch(resetForm());
      router.push("/dashboard");
    } catch (err) {
      console.error(`Error ${isEditMode ? "updating" : "creating"} persona:`, err);
      setSubmitError(
        `Couldn't ${isEditMode ? "update" : "create"} your persona. Please try again.`,
      );
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {/* Error summary */}
      <FormError errors={errors} visible={hasErrors} />

      {submitError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {submitError}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={isFirstStep || isLoading}
        >
          Back
        </Button>

        {isLastStep ? (
          <Button
            variant="success"
            onClick={handleSubmit}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isEditMode ? "Update Persona" : "Create Persona"}
          </Button>
        ) : (
          <Button variant="primary" onClick={handleNext} disabled={isLoading}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
