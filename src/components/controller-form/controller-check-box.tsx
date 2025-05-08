/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Typography } from 'antd';
import type { CheckboxProps } from 'antd';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormLabel from './form-label';

interface ControllerCheckboxType<TFieldValues extends FieldValues = FieldValues> extends CheckboxProps {
   /**
    * Name of the field in the form (required for `react-hook-form`).
    */
   name: Path<TFieldValues>;

   /**
    * Optional label to display above the checkbox group.
    */
   label?: string;

   /**
    * If true, an asterisk will be shown next to the label indicating that the field is required.
    */
   required?: boolean;

   /**
    * `react-hook-form` control object to handle field validation and management.
    */
   control: Control<TFieldValues>;

   /**
    * Array of options to be passed to Checkbox.Group.
    */
   options?: { label: string; value: string | number }[];

   /**
    * If true, display error message under the checkbox group.
    */
   showError?: boolean;
}

const ControllerCheckbox = <TFieldValues extends FieldValues = FieldValues>({
   control,
   name,
   label,
   required = false,
   options,
   showError = true,
   ...resProps
}: ControllerCheckboxType<TFieldValues>) => {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field, fieldState }) => {
            const handleChange = (checkedValues: any) => {
               field.onChange(checkedValues);
            };

            return (
               <div className="flex flex-col gap-y-1">
                  {(label || required) && <FormLabel label={label ?? ''} id={resProps.id} required={required} />}

                  <div className="flex flex-col gap-y-0.5">
                     <Checkbox.Group {...field} {...resProps} options={options} onChange={handleChange} />

                     {showError && fieldState?.error && (
                        <Typography.Text className="pl-1 text-red-500">{fieldState?.error?.message}</Typography.Text>
                     )}
                  </div>
               </div>
            );
         }}
      />
   );
};

export default ControllerCheckbox;
