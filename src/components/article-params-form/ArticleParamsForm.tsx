// src/components/article-params-form/ArticleParamsForm.tsx
import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { useOutsideClick } from 'src/ui/radio-group/hooks/useOutsideClick';

import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	appliedState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	appliedState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(appliedState);

	const sidebarRef = useRef<HTMLDivElement>(null);
	useOutsideClick(sidebarRef, () => setIsOpen(false));

	// При открытии — синхронизируем форму с текущим appliedState
	useEffect(() => {
		if (isOpen) {
			setFormState(appliedState);
		}
	}, [isOpen, appliedState]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		// СБРОС НА ИСХОДНОЕ СОСТОЯНИЕ СТРАНИЦЫ
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[number]) =>
		setFormState((prev) => ({ ...prev, fontFamilyOption: option }));

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[number]) =>
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));

	const handleFontColorChange = (option: (typeof fontColors)[number]) =>
		setFormState((prev) => ({ ...prev, fontColor: option }));

	const handleBgColorChange = (option: (typeof backgroundColors)[number]) =>
		setFormState((prev) => ({ ...prev, backgroundColor: option }));

	const handleContentWidthChange = (option: (typeof contentWidthArr)[number]) =>
		setFormState((prev) => ({ ...prev, contentWidth: option }));

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${isOpen ? styles.open : ''}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.title}>
						<Text as='h2' size={31} weight={800} uppercase>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>
					</div>

					<div className={styles.contentWrapper}>
						<Select
							title='ШРИФТ'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
						/>

						<RadioGroup
							title='РАЗМЕР ШРИФТА'
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>

						<Select
							title='ЦВЕТ ШРИФТА'
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
						/>

						<hr className={styles.divider} />

						<Select
							title='ЦВЕТ ФОНА'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBgColorChange}
						/>

						<Select
							title='ШИРИНА КОНТЕНТА'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='СБРОСИТЬ' type='clear' onClick={handleReset} />
						<Button title='ПРИМЕНИТЬ' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
