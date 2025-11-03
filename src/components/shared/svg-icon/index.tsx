import { useSvgIcon } from '@hooks';
import { type ComponentProps, type ElementType } from 'react';

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

   const Component = Icon as ElementType<React.SVGProps<SVGSVGElement>>;

   return <Component {...props} />;
};

export default SvgIcon;
