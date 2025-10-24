import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appliedArticleState, setAppliedArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleApply = (newState: ArticleStateType) => {
		setAppliedArticleState(newState);
		setIsSidebarOpen(false); // можно закрывать после применения
	};

	const handleToggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const handleCloseSidebar = () => {
		setIsSidebarOpen(false);
	};

	// Закрытие по клику вне сайдбара
	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			const sidebar = document.querySelector(`.${styles.container}`);
			const arrowButton = document.querySelector(
				'[data-testid="arrow-button"]'
			); // или другой способ идентифицировать кнопку
			if (
				sidebar &&
				!sidebar.contains(e.target as Node) &&
				arrowButton &&
				!arrowButton.contains(e.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isSidebarOpen]);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedArticleState.fontFamilyOption.value,
					'--font-size': appliedArticleState.fontSizeOption.value,
					'--font-color': appliedArticleState.fontColor.value,
					'--container-width': appliedArticleState.contentWidth.value,
					'--bg-color': appliedArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={handleToggleSidebar}
				onClose={handleCloseSidebar}
				initialState={appliedArticleState}
				onApply={handleApply}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
