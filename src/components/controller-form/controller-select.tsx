import { Select, type SelectProps, Typography } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormLabel from './form-label';

interface ControllerSelectType<TFieldValues extends FieldValues = FieldValues> extends SelectProps {
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
    * If true, display error messages under the input field.
    */
   showError?: boolean;

   /**
    * Custom change event handler (optional).
    */
   onChange?: (value: string, option?: DefaultOptionType | DefaultOptionType[]) => void;
}

function ControllerSelect<TFieldValues extends FieldValues = FieldValues>(props: ControllerSelectType<TFieldValues>) {
   const { control, name, onChange, size = 'large', label, required = false, showError = true, ...resProps } = props;

   return (
      <Controller
         name={name}
         control={control}
         render={({ field, fieldState }) => {
            return (
               <div className="flex w-full flex-col gap-y-1">
                  {(label || required) && <FormLabel label={label ?? ''} id={resProps.id} required={required} />}

                  <Select
                     {...field}
                     {...resProps}
                     onChange={(value: string, option?: DefaultOptionType | DefaultOptionType[]) => {
                        field.onChange(value);
                        onChange?.(value, option);
                     }}
                     allowClear
                     className="fz-16 w-full"
                     size={size}
                  />

                  {showError && fieldState?.error && (
                     <Typography.Text className="text-red-500">{fieldState?.error?.message}</Typography.Text>
                  )}
               </div>
            );
         }}
      />
   );
}

export default ControllerSelect;
