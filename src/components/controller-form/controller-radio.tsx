import { Radio, Typography } from 'antd';
import type { RadioProps } from 'antd';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormLabel from './form-label';

interface ControllerRadioType<TFieldValues extends FieldValues = FieldValues> extends RadioProps {
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
    * List of radio options to display.
    * Each option consists of a `label` and a `value`.
    */
   options: { label: string; value: string | number }[];

   /**
    * If true, display error messages under the input field.
    */
   showError?: boolean;
}

function ControllerRadio<TFieldValues extends FieldValues = FieldValues>(props: ControllerRadioType<TFieldValues>) {
   const { control, name, label, required = false, options, showError = true, ...resProps } = props;

   return (
      <Controller
         name={name}
         control={control}
         render={({ field, fieldState }) => (
            <div className="flex flex-col gap-y-1">
               {(label || required) && <FormLabel label={label ?? ''} id={resProps.id} required={required} />}

               <div className="flex flex-col gap-y-0.5">
                  <Radio.Group {...field} {...resProps} onChange={(e) => field.onChange(e.target.value)}>
                     {options.map((option) => (
                        <Radio key={option.value} value={option.value}>
                           {option.label}
                        </Radio>
                     ))}
                  </Radio.Group>

                  {showError && fieldState?.error && (
                     <Typography.Text className="text-red-500">{fieldState.error.message}</Typography.Text>
                  )}
               </div>
            </div>
         )}
      />
   );
}

export default ControllerRadio;
