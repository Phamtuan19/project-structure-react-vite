/**
 * FormLabel component - A customizable label component for forms.
 *
 * This component allows you to display a label with optional required asterisk,
 * custom styling, and provides support for accessibility via ARIA attributes.
 *
 * Props:
 * - `label`: The text content of the label (required).
 * - `required`: If true, a red asterisk (`*`) will be displayed next to the label (default: false).
 * - `id`: The unique ID for the input field, which will be linked to the label (required).
 * - `requiredColor`: Custom color for the required asterisk (default: 'text-red-500').
 * - `className`: Additional custom classes for the wrapper element.
 * - `labelClassName`: Custom classes for the label element.
 * - `disabled`: If true, apply the disabled styling to the label (default: false).
 * - `ariaLabelledBy`: Use for accessibility. Link the label to another element (optional).
 *
 * Example usage:
 * ```tsx
 * <FormLabel
 *   label="Username"
 *   required
 *   id="username"
 *   requiredColor="text-blue-500"
 *   className="my-4"
 *   labelClassName="text-lg text-gray-700"
 * />
 * ```
 */
import { cn } from '@utils';
import React from 'react';

interface FormLabelProps {
   /**
    * The text content of the label.
    */
   label: string;

   /**
    * If true, the required asterisk will be displayed next to the label.
    */
   required?: boolean;

   /**
    * The unique ID of the input field that this label is associated with.
    */
   id?: string;

   /**
    * Custom color for the required asterisk (default: 'text-red-500').
    */
   requiredColor?: string;

   /**
    * Custom additional classes for the wrapper element.
    */
   className?: string;

   /**
    * Custom additional classes for the label element.
    */
   labelClassName?: string;

   /**
    * If true, apply the disabled styling to the label.
    */
   disabled?: boolean;

   /**
    * Accessibility enhancement: ID of the element that the label is describing.
    * If set, this will link the label to another element for better accessibility.
    */
   ariaLabelledBy?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
   label,
   required = false,
   id,
   requiredColor = 'text-red-500',
   className = '',
   labelClassName = '',
   disabled = false,
   ariaLabelledBy,
}) => {
   return (
      <div
         className={cn(
            'flex items-center justify-start gap-x-1 pl-1',
            className,
            disabled ? 'cursor-not-allowed opacity-50' : '',
         )}
      >
         <label
            htmlFor={id}
            id={ariaLabelledBy}
            className={cn('font-normal', labelClassName, disabled ? 'text-gray-400' : '')}
            aria-label={label}
         >
            {label}
         </label>
         {required && (
            <span className={cn(requiredColor, 'ml-1')} aria-hidden="true">
               *
            </span>
         )}
      </div>
   );
};

export default FormLabel;
