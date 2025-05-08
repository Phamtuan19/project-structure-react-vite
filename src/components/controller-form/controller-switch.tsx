import type { SwitchProps } from 'antd';
import { Switch, Typography } from 'antd';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormLabel from './form-label';

interface ControllerSwitchType<TFieldValues extends FieldValues = FieldValues> extends SwitchProps {
   /**
    * Field name in react-hook-form (required).
    */
   name: Path<TFieldValues>;

   /**
    * Label to display above or next to the switch.
    */
   label?: string;

   /**
    * If true, display an asterisk * to indicate a required field.
    * Default: false.
    */
   required?: boolean;

   /**
    * Control object of react-hook-form.
    * Required to connect to form state.
    */
   control: Control<TFieldValues>;

   /**
    * If true, display validation errors below the switch.
    * Default: true.
    */
   showError?: boolean;
}

const ControllerSwitch = <TFieldValues extends FieldValues = FieldValues>({
   control,
   name,
   label,
   required = false,
   showError = true,
   ...resProps
}: ControllerSwitchType<TFieldValues>) => {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field, fieldState }) => (
            <div className="flex flex-col gap-y-1">
               {(label || required) && <FormLabel label={label ?? ''} id={resProps.id} required={required} />}

               <div className="flex w-fit flex-col gap-y-0.5">
                  <Switch
                     {...field}
                     {...resProps}
                     onChange={(checked, event) => {
                        field.onChange(checked);
                        resProps?.onChange?.(checked, event);
                     }}
                  />
                  {showError && fieldState?.error && (
                     <Typography.Text className="text-red-500">{fieldState.error.message}</Typography.Text>
                  )}
               </div>
            </div>
         )}
      />
   );
};

export default ControllerSwitch;
