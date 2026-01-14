/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSvgIcon } from '@hooks';
import { type ComponentProps, useMemo } from 'react';

type SvgIconProps = ComponentProps<'svg'> & {
   /**
    * Icon name without extension (e.g., 'react' for 'react.svg')
    */
   name: string;
   /**
    * Show error message in UI instead of throwing
    *
    * @default false
    */
   showError?: boolean;
   /**
    * Fallback component to show when icon is loading or not found
    */
   fallback?: React.ReactNode;
};

/**
 * SvgIcon component that dynamically loads and renders SVG icons.
 *
 * Features:
 * - Graceful error handling (no throwing in render)
 * - Loading state with placeholder
 * - Customizable fallback UI
 * - Proper viewBox handling
 * - Type-safe props
 *
 * @param props - Component props extending SVG element props
 * @returns SVG icon component or fallback UI
 * @example
 * ```tsx
 * <SvgIcon name="react" width={24} height={24} />
 * <SvgIcon name="react" width={24} height={24} showError fallback={<div>Icon not found</div>} />
 * ```
 */
const SvgIcon = ({ name, showError = false, fallback, ...props }: SvgIconProps) => {
   const { error, loading, Icon, DEFAULT_ICON_SIZE: defaultSize, DEFAULT_VIEWBOX: defaultViewBox } = useSvgIcon(name);

   // Calculate dimensions with proper defaults
   // Note: viewBox is only set if explicitly provided by user, otherwise preserve SVG's default viewBox
   const { width, height, hasViewBox, viewBox } = useMemo(() => {
      const w = props.width ? Number(props.width) : defaultSize;
      const h = props.height ? Number(props.height) : defaultSize;
      const hasViewBox = 'viewBox' in props && props.viewBox !== undefined;
      const vb = hasViewBox ? props.viewBox : undefined;

      return { width: w, height: h, hasViewBox, viewBox: vb };
   }, [props.width, props.height, props.viewBox, defaultSize]);

   // Error state: show error message or fallback
   if (error) {
      // Extract width, height, viewBox from props to avoid overriding calculated values
      const { width: _width, height: _height, viewBox: _viewBox, ...errorProps } = props;

      if (showError) {
         return (
            <svg
               width={width}
               height={height}
               viewBox={hasViewBox ? viewBox : defaultViewBox}
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               role="img"
               aria-label={`Error loading icon: ${name}`}
               {...errorProps}
            >
               <title>Error: {error.message}</title>
               <rect width={width} height={height} fill="currentColor" opacity={0.1} />
               <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={Math.min(width, height) * 0.3}
                  fill="currentColor"
                  opacity={0.5}
               >
                  ?
               </text>
            </svg>
         );
      }

      if (fallback) {
         return <>{fallback}</>;
      }

      // Default: return empty placeholder
      // Only set viewBox if user explicitly provided it
      const errorSvgProps = hasViewBox ? { width, height, viewBox, ...errorProps } : { width, height, ...errorProps };
      return <svg fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...errorSvgProps} />;
   }

   // Loading state: show placeholder
   if (loading) {
      // Extract width, height, viewBox from props to avoid overriding calculated values
      const { width: _width, height: _height, viewBox: _viewBox, ...loadingProps } = props;

      if (fallback) {
         return <>{fallback}</>;
      }

      // Only set viewBox if user explicitly provided it
      const loadingSvgProps = hasViewBox
         ? { width, height, viewBox, ...loadingProps }
         : { width, height, ...loadingProps };
      return (
         <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={`Loading icon: ${name}`}
            aria-busy="true"
            {...loadingSvgProps}
         >
            <rect width={width} height={height} fill="currentColor" opacity={0.05} />
         </svg>
      );
   }

   // Icon not loaded (shouldn't happen, but handle gracefully)
   if (!Icon) {
      // Extract width, height, viewBox from props to avoid overriding calculated values
      const { width: _width, height: _height, viewBox: _viewBox, ...emptyProps } = props;

      if (fallback) {
         return <>{fallback}</>;
      }

      // Only set viewBox if user explicitly provided it
      const emptySvgProps = hasViewBox ? { width, height, viewBox, ...emptyProps } : { width, height, ...emptyProps };
      return <svg fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...emptySvgProps} />;
   }

   // Render the icon
   // Extract width, height, viewBox from props to avoid overriding calculated values
   // Only pass viewBox if user explicitly provided it, otherwise let SVG use its default
   const { width: _width, height: _height, viewBox: _viewBox, ...restProps } = props;
   const iconProps = hasViewBox ? { width, height, viewBox, ...restProps } : { width, height, ...restProps };
   return <Icon {...iconProps} />;
};

export default SvgIcon;
