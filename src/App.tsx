// src/App.tsx
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { CSSProperties } from 'react';
import './styles/index.scss';

export const App = () => {
	return (
		<ArticleParamsForm>
			{(appliedState) => (
				<main
					style={
						{
							'--font-family': appliedState.fontFamilyOption.value,
							'--font-size': appliedState.fontSizeOption.value,
							'--font-color': appliedState.fontColor.value,
							'--container-width': appliedState.contentWidth.value,
							'--bg-color': appliedState.backgroundColor.value,
						} as CSSProperties
					}>
					<Article />
				</main>
			)}
		</ArticleParamsForm>
	);
};
