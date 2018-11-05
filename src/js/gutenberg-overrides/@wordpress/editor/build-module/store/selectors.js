import * as others from '@wordpress/editor/build-module/store/selectors?source=node_modules';

// no utility level => no Most Used blocks section
others.INSERTER_UTILITY_HIGH = others.INSERTER_UTILITY_NONE;
others.INSERTER_UTILITY_MEDIUM = others.INSERTER_UTILITY_NONE;
others.INSERTER_UTILITY_LOW = others.INSERTER_UTILITY_NONE;

export * from '@wordpress/editor/build-module/store/selectors?source=node_modules';
