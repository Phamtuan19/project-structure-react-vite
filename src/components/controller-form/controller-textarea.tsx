import { Typography } from 'antd';
import type { TextAreaProps } from 'antd/es/input/TextArea';
import TextArea from 'antd/es/input/TextArea';
import type { ChangeEvent } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormLabel from './form-label';

interface ControllerTextAreaProps<TFieldValues extends FieldValues = FieldValues> extends TextAreaProps {
   /**
    * Tên của field trong react-hook-form. Đây là key dùng để liên kết với form state.
    */
   name: Path<TFieldValues>;

   /**
    * Label hiển thị phía trên textarea (nếu có).
    */
   label?: string;

   /**
    * Nếu `true`, sẽ hiển thị dấu * kế bên label để biểu thị trường bắt buộc.
    * Mặc định: `false`.
    */
   required?: boolean;

   /**
    * Control object của react-hook-form để điều phối state và validation.
    */
   control: Control<TFieldValues>;

   /**
    * Cờ cho biết có hiển thị lỗi bên dưới textarea hay không.
    * Mặc định: `true`.
    *
    * @deprecated Sử dụng `showError` thay cho `isShowError`. `isShowError` sẽ bị loại bỏ trong tương lai.
    */
   isShowError?: boolean;

   /**
    * Callback khi giá trị thay đổi. Ngoài ra vẫn trigger field.onChange từ react-hook-form.
    */
   onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;

   /**
    * Nếu `true`, hiển thị thông báo lỗi khi có lỗi từ react-hook-form.
    * Mặc định: `true`.
    */
   showError?: boolean;
}

function ControllerTextArea<TFieldValues extends FieldValues = FieldValues>(
   props: ControllerTextAreaProps<TFieldValues>,
) {
   const { name, control, label, required = false, onChange, showError = true, ...resProps } = props;

   return (
      <Controller
         name={name}
         control={control}
         render={({ field, fieldState }) => {
            return (
               <div className="flex h-full w-full flex-col gap-y-1">
                  {(label || required) && <FormLabel label={label ?? ''} id={resProps.id} required={required} />}

                  <div className="flex h-full w-full flex-col gap-y-0.5">
                     <TextArea
                        {...field}
                        {...resProps}
                        onChange={(e) => {
                           field.onChange(e);
                           onChange?.(e);
                        }}
                        onBlur={(e) => {
                           field.onBlur();
                           resProps.onBlur?.(e);
                        }}
                     />

                     {showError && fieldState?.error && (
                        <Typography.Text className="text-red-500">{fieldState.error.message}</Typography.Text>
                     )}
                  </div>
               </div>
            );
         }}
      />
   );
}

export default ControllerTextArea;
