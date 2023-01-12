import React from 'react';

type ContainerProps = {
    as?: "div" | "header" | "main" | "section" | "article" | "aside" | "footer";
    xl?: boolean;
    lg?: boolean;
    md?: boolean;
    sm?: boolean;
    children?: React.ReactNode;
    childrenElement: JSX.Element;
    style?: React.CSSProperties;
    props: React.ComponentPropsWithoutRef<"div">;
};
declare function Container({ as, xl, lg, md, sm, ...restProps }: ContainerProps): JSX.Element;

type RowStyleProps = {
    as?: "div" | "header" | "main" | "section" | "article" | "aside" | "footer";
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
    align?: "start" | "end" | "center";
    wrap?: false | true | "wrap" | "nowrap" | "wrap-reverse";
    gap?: string;
};
type RowProps = any | (RowStyleProps & {
    sm?: RowStyleProps;
    md?: RowStyleProps;
    lg?: RowStyleProps;
    xl?: RowStyleProps;
    xxl?: RowStyleProps;
});
declare function Row(props: RowProps): JSX.Element;

type ColStyleProps = {
    as?: "div" | "header" | "main" | "section" | "article" | "aside" | "footer";
    size?: "grow" | "auto" | number;
    justify?: "start" | "end" | "center" | "stretch";
    align?: "start" | "end" | "center" | "stretch";
};
type ColProps = any | (ColStyleProps & {
    sm?: ColStyleProps;
    md?: ColStyleProps;
    lg?: ColStyleProps;
    xl?: ColStyleProps;
    xxl?: ColStyleProps;
});
declare function Col(props: ColProps): JSX.Element;

type BreakpointsTypes = "sm" | "md" | "lg" | "xl" | "xxl" | string;

declare function getBreakpoints(from?: "first" | "last" | BreakpointsTypes, to?: "first" | "last" | BreakpointsTypes): BreakpointsTypes[];

declare function getContainerWidth(bp: string): string | number;

declare function getMediaCSS(bp: string, content: string): string;

export { Col, Container, Row, getBreakpoints, getContainerWidth, getMediaCSS };
