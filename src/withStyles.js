import React, { forwardRef, useContext } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import ThemeContext from "./ThemeContext";
import RNInterface from "./RNInterface";

const EMPTY_STYLES = {};
const EMPTY_STYLES_FN = () => EMPTY_STYLES;
const DEFAULT_THEME = "light";

function withStyles(stylesFn = EMPTY_STYLES_FN, { flushBefore = false } = {}) {
  stylesFn = stylesFn || EMPTY_STYLES_FN;

  const stylesFnResultCacheMap =
    typeof WeakMap === "undefined" ? new Map() : new WeakMap();

  function getOrCreateStylesFnResultCache(theme) {
    const cachedResultForTheme = stylesFnResultCacheMap.get(theme);
    const stylesFnResult = cachedResultForTheme || stylesFn(theme) || {};
    stylesFnResultCacheMap.set(theme, stylesFnResult); // cache the result of stylesFn(theme)
    return stylesFnResult;
  }

  const withStylesCache =
    typeof WeakMap === "undefined" ? new Map() : new WeakMap();

  function getComponentCache(theme, component, themeType) {
    const themeCache = withStylesCache.get(theme);
    if (!themeCache) {
      return null;
    }
    const componentCache = themeCache.get(component);
    if (!componentCache) {
      return null;
    }
    return componentCache[themeType];
  }

  function updateComponentCache(theme, component, themeType, results) {
    let themeCache = withStylesCache.get(theme);
    if (!themeCache) {
      themeCache = typeof WeakMap === "undefined" ? new Map() : new WeakMap();
      withStylesCache.set(theme, themeCache);
    }
    let componentCache = themeCache.get(component);
    if (!componentCache?.[themeType]) {
      componentCache = { ...componentCache, [themeType]: {} };
      themeCache.set(component, componentCache);
    }

    componentCache[themeType] = results;
  }

  function makeCreateFn(stylesInterface) {
    let create = stylesInterface.create_style || stylesInterface.create;
    const original = create;
    return { create, original };
  }

  function makeResolveFn(stylesInterface) {
    let resolve = stylesInterface.resolve_style || stylesInterface.resolve;
    const original = resolve;
    return { resolve, original };
  }

  return function withStylesHOC(WrappedComponent) {
    const WithStyles = ({ forwardedRef, ...rest }) => {
      const context = useContext(ThemeContext);

      const getCurrentInterface = () => {
        return RNInterface;
      };

      const getCurrentTheme = () => {
        const { theme = {}, themeType = DEFAULT_THEME } = context;
        const { colors, ...rest } = theme;

        return {
          color: colors[themeType || DEFAULT_THEME] || {},
          ...rest,
        };
      };

      const getProps = () => {
        const stylesInterface = getCurrentInterface();
        const theme = getCurrentTheme();

        const componentCache = getComponentCache(
          theme,
          WithStyles,
          context?.themeType
        );

        const interfaceChanged =
          !componentCache ||
          !componentCache.stylesInterface ||
          (stylesInterface &&
            componentCache.stylesInterface !== stylesInterface);
        const themeChanged = !componentCache || componentCache.theme !== theme;

        if (!interfaceChanged && !themeChanged) {
          return componentCache.props;
        }

        const createFn =
          (interfaceChanged && makeCreateFn(stylesInterface)) ||
          componentCache.create;
        const resolveFn =
          (interfaceChanged && makeResolveFn(stylesInterface)) ||
          componentCache.resolve;

        const { create } = createFn;

        const createChanged =
          !componentCache ||
          !componentCache.create ||
          createFn.original !== componentCache.create.original;

        const stylesFnResult = getOrCreateStylesFnResultCache(theme);
        const styles =
          ((createChanged ||
            stylesFnResult !== componentCache.stylesFnResult) &&
            create(stylesFnResult)) ||
          componentCache.props.styles;
        const props = { styles, theme };
        const results = {
          stylesInterface,
          theme,
          create: createFn,
          resolve: resolveFn,
          stylesFnResult,
          props,
        };

        updateComponentCache(theme, WithStyles, context.themeType, results);

        return props;
      };

      const flush = () => {
        const stylesInterface = getCurrentInterface();
        if (stylesInterface && stylesInterface.flush) {
          stylesInterface.flush();
        }
      };

      const { styles, theme } = getProps();

      if (flushBefore) {
        flush();
      }

      return (
        <WrappedComponent
          ref={forwardedRef}
          {...rest}
          {...{
            styles,
            theme,
            themeType: context.themeType,
            toggleTheme: context.toggleTheme,
          }}
        />
      );
    };

    const ForwardedWithStyles = forwardRef((props, ref) => (
      <WithStyles {...props} forwardedRef={ref} />
    ));

    if (WrappedComponent.propTypes) {
      ForwardedWithStyles.propTypes = { ...WrappedComponent.propTypes };
      delete ForwardedWithStyles.propTypes.styles;
      delete ForwardedWithStyles.propTypes.theme;
    }
    if (WrappedComponent.defaultProps) {
      ForwardedWithStyles.defaultProps = { ...WrappedComponent.defaultProps };
    }
    ForwardedWithStyles.WrappedComponent = WrappedComponent;

    return hoistNonReactStatics(ForwardedWithStyles, WrappedComponent);
  };
}

export default withStyles;
