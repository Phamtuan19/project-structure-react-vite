import { useSvgIcon } from '@hooks';
import { type ComponentProps } from 'react';

type SvgIconProps = ComponentProps<'svg'> & {
   name: string;
};

const SvgIcon = ({ name, ...props }: SvgIconProps) => {
   const { error, loading, Icon } = useSvgIcon(name);

   const width = props.width ? +props.width : 10;
   const height = props.height ? +props.height : 10;

   if (error) {
      throw new Error(error.message);
   }

   if (loading) {
      return <svg width={width} height={height} fill="none" viewBox={`0 0 ${width} ${height}`} />;
   }

   if (!Icon) {
      return <svg width={width} height={height} fill="none" viewBox={`0 0 ${width} ${height}`} />;
   }

   return <Icon {...props} />;
};

export default SvgIcon;
