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
  const [
    createPersona,
    { isLoading: isCreating, isSuccess: createSuccess, error: createError },
  ] = useCreatePersonaMutation();

  const [
    updatePersona,
    { isLoading: isUpdating, isSuccess: updateSuccess, error: updateError },
  ] = useUpdatePersonaMutation();

  // Combined loading and success states
  const isLoading = isCreating || isUpdating;
  const isSuccess = createSuccess || updateSuccess;
  const error = createError || updateError;

  // Check if there are any validation errors
  useEffect(() => {
    setHasErrors(Object.keys(errors).length > 0);
  }, [errors]);

  // Redirect to dashboard when persona is successfully created/updated
  useEffect(() => {
    if (isSuccess) {
      // Reset the form state after successful submission
      dispatch(resetForm());

      // Show appropriate success message
      if (isEditMode) {
        alert("Persona updated successfully!");
      } else {
        alert("Persona created successfully!");
      }

      // Navigate back to dashboard
      router.push("/dashboard");
    }
  }, [isSuccess, router, dispatch, isEditMode]);

  const isLastStep = formStep === steps.length - 1;
  const isFirstStep = formStep === 0;

  const handleNext = () => {
    // Log current state to help debugging
    console.log("Current step:", formStep);
    console.log("Current errors:", errors);

    // Dispatch action to validate and move to next step
    dispatch(nextStep());
  };

  const handlePrev = () => {
    dispatch(goToStep(formStep - 1));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode && personaId) {
        // Update existing persona
        await updatePersona({
          id: personaId,
          personaData: formData,
        }).unwrap();
      } else {
        // Create new persona
        await createPersona(formData).unwrap();
      }
      // Success is handled in the useEffect
    } catch (err) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} persona:`,
        err
      );
      alert(
        `Error ${
          isEditMode ? "updating" : "creating"
        } persona. Please try again.`
      );
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {/* Error summary */}
      <FormError errors={errors} visible={hasErrors} />

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
