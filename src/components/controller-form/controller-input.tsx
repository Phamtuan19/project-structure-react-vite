import { Input, type InputProps, Typography } from 'antd';
import type { ChangeEvent } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormLabel from './form-label';
import { useTranslation } from 'react-i18next';

interface ControllerInputType<TFieldValues extends FieldValues = FieldValues> extends InputProps {
   /**
    * Name of the field (required for `react-hook-form`).
    */
   name: Path<TFieldValues>;

   /**
    * Optional label to display above the input field.
    */
   label?: string;

   /**
    * If true, an asterisk will be shown next to the label.
    */
   required?: boolean;

   /**
    * `react-hook-form` control object to handle field validation and management.
    */
   control: Control<TFieldValues>;

   /**
    * Custom change event handler (optional).
    */
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

   /**
    * If true, display error messages under the input field.
    */
   showError?: boolean;

   /**
    * Custom handler for blur event (optional).
    */
   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const ControllerInput = <TFieldValues extends FieldValues = FieldValues>({
   control,
   name,
   onChange,
   size = 'large',
   label,
   required = false,
   showError = true,
   onBlur,
   ...resProps
}: ControllerInputType<TFieldValues>) => {
   const { t } = useTranslation();

   return (
      <Controller
         name={name}
         control={control}
         render={({ field, fieldState }) => {
            const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
               field.onChange(e);
               onChange?.(e);
            };

            const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
               field.onBlur();
               onBlur?.(e);
            };

            return (
               <div className="flex w-full flex-col gap-y-1">
                  {(label || required) && <FormLabel label={label ?? ''} id={resProps.id} required={required} />}

                  <div className="flex flex-col gap-y-0.5">
                     <Input {...field} {...resProps} onChange={handleChange} onBlur={handleBlur} size={size} />

                     {showError && fieldState?.error && (
                        <Typography.Text className="pl-1 text-sm! text-red-500!">
                           {t(fieldState.error.message as never)}
                        </Typography.Text>
                     )}
                  </div>
               </div>
            );
         }}
      />
   );
};

export default ControllerInput;
