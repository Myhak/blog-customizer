// src/components/article-params-form/ArticleParamsForm.tsx
import { useState, useRef, useEffect, ReactNode } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
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
import clsx from 'clsx';

interface ArticleParamsFormProps {
	children: (appliedState: ArticleStateType) => ReactNode;
}

export const ArticleParamsForm = ({ children }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement>(null);
	useOutsideClick(sidebarRef, () => setIsOpen(false));

	// При открытии — сбрасываем форму на последнее применённое состояние
	useEffect(() => {
		if (isOpen) {
			setFormState(appliedState);
		}
	}, [isOpen, appliedState]);

	const handleApply = () => {
		setAppliedState(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(appliedState); // сброс на последнее применённое
		setAppliedState(appliedState); // сразу применяем
		// isOpen остаётся открытым — по ТЗ сброс не закрывает панель
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleApply();
	};

	// Обработчики изменений
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
			{isOpen && (
				<aside ref={sidebarRef} className={clsx(styles.container, styles.open)}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>

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
			)}

			{/* Рендерим детей с актуальным appliedState */}
			{children(appliedState)}
		</>
	);
};
