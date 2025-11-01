// src/App.tsx
import { useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import { CSSProperties } from 'react';
import './styles/index.scss';

export const App = () => {
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					backgroundColor: appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				appliedState={appliedState}
				onApply={setAppliedState}
			/>
			<Article />
		</main>
	);
};
