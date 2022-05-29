import React from 'react';

import withPerf from './perf';
import RNInterface from './RNInterface';
import {useWithStyle} from './ThemeContext';

const EMPTY_STYLES = {};
const EMPTY_STYLES_FN = () => EMPTY_STYLES;

function withStyle(
  Component,
  stylesFn = EMPTY_STYLES_FN,
  {flushBefore = false} = {},
) {
  stylesFn = stylesFn || EMPTY_STYLES_FN;

  const stylesFnResultCacheMap =
    typeof WeakMap === 'undefined' ? new Map() : new WeakMap();

  function getOrCreateStylesFnResultCache(theme) {
    const cachedResultForTheme = stylesFnResultCacheMap.get(theme);
    const stylesFnResult = cachedResultForTheme || stylesFn(theme) || {};
    stylesFnResultCacheMap.set(theme, stylesFnResult); // cache the result of stylesFn(theme)
    return stylesFnResult;
  }

  const withStylesCache =
    typeof WeakMap === 'undefined' ? new Map() : new WeakMap();

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

  function updateComponentCache(
    theme,
    component,
    themeType,
    results,
    themeTypes,
  ) {
    let themeCache = withStylesCache.get(theme);

    if (!themeCache) {
      themeCache = typeof WeakMap === 'undefined' ? new Map() : new WeakMap();
      withStylesCache.set(theme, themeCache);
    }
    let componentCache = themeCache.get(component);

    if (!componentCache) {
      themeTypes.map(themeKey => {
        componentCache = {
          ...componentCache,
          [themeKey]: {},
        };
      });
      themeCache.set(component, componentCache);
    }
    componentCache[themeType] = results;
  }

  function makeCreateFn(themeType, stylesInterface) {
    const themeSelector = themeType.toUpperCase();
    let create =
      stylesInterface[`create${themeSelector}`] || stylesInterface.create;
    const original = create;
    if (process.env.NODE_ENV !== 'production') {
      create = withPerf('create')(create);
    }
    return {create, original};
  }

  function makeResolveFn(themeType, stylesInterface) {
    const themeSelector = themeType.toUpperCase();
    let resolve =
      stylesInterface[`resolve${themeSelector}`] || stylesInterface.resolve;
    const original = resolve;
    if (process.env.NODE_ENV !== 'production') {
      resolve = withPerf('resolve')(resolve);
    }
    return {resolve, original};
  }

  const WithStyles = props => {
    const context = useWithStyle();

    const getCurrentTheme = () => {
      return context && context.currentTheme;
    };

    const getCurrentThemeType = () => {
      return (context && context.themeType) || 'light';
    };

    const getThemeTypes = () => {
      return context && context.themeTypes;
    };

    const getProps = () => {
      const stylesInterface = RNInterface;
      const theme = getCurrentTheme();
      const themeType = getCurrentThemeType();

      const componentCache = getComponentCache(theme, WithStyles, themeType);

      const interfaceChanged =
        !componentCache ||
        !componentCache.stylesInterface ||
        (stylesInterface && componentCache.stylesInterface !== stylesInterface);

      const themeChanged = !componentCache || componentCache.theme !== theme;

      if (!themeChanged) {
        return componentCache.props;
      }

      const createFn =
        (interfaceChanged && makeCreateFn(themeType, stylesInterface)) ||
        componentCache.create;
      const resolveFn =
        (interfaceChanged && makeResolveFn(themeType, stylesInterface)) ||
        componentCache.resolve;

      const {create} = createFn;

      const createChanged =
        !componentCache ||
        !componentCache.create ||
        createFn.original !== componentCache.create.original;

      const stylesFnResult = getOrCreateStylesFnResultCache(theme);
      const styles =
        ((createChanged || stylesFnResult !== componentCache.stylesFnResult) &&
          create(stylesFnResult)) ||
        componentCache.props.styles;
      const themeTypes = getThemeTypes();
      const props = {styles, theme, themeType, themeTypes};

      updateComponentCache(
        theme,
        WithStyles,
        themeType,
        {
          stylesInterface,
          theme,
          create: createFn,
          resolve: resolveFn,
          stylesFnResult,
          props,
        },
        themeTypes,
      );

      return props;
    };

    const flush = () => {
      const stylesInterface = RNInterface;
      if (stylesInterface && stylesInterface.flush) {
        stylesInterface.flush();
      }
    };

    const {theme, styles, themeType, themeTypes} = getProps();

    if (flushBefore) {
      flush();
    }

    return (
      <Component
        {...props}
        {...{
          currentTheme: theme,
          styles,
          themeType,
          themeTypes,
          toggleTheme: context.toggleTheme,
        }}
      />
    );
  };

  return WithStyles;
}

export default withStyle;
