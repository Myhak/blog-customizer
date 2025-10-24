import { useState, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	initialState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	initialState,
	onApply,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(initialState);

	useEffect(() => {
		if (isOpen) {
			setFormState(initialState);
		}
	}, [isOpen, initialState]);

	const handleReset = () => {
		setFormState(initialState);
		onApply(initialState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleFontFamilyChange = (
		option: (typeof fontFamilyOptions)[number]
	) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[number]) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleFontColorChange = (option: (typeof fontColors)[number]) => {
		setFormState((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBgColorChange = (option: (typeof backgroundColors)[number]) => {
		setFormState((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (
		option: (typeof contentWidthArr)[number]
	) => {
		setFormState((prev) => ({ ...prev, contentWidth: option }));
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={onToggle}
				data-testid='arrow-button'
			/>
			{isOpen && (
				<aside className={styles.container}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>

						<div className={styles.section}>
							<label className={styles.label}>ШРИФТ</label>
							<Select
								selected={formState.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={handleFontFamilyChange}
							/>
						</div>

						<div className={styles.section}>
							<label className={styles.label}>РАЗМЕР ШРИФТА</label>
							<RadioGroup
								name='fontSize'
								options={fontSizeOptions}
								selected={formState.fontSizeOption}
								onChange={handleFontSizeChange}
								title={''}
							/>
						</div>

						<div className={styles.section}>
							<label className={styles.label}>ЦВЕТ ШРИФТА</label>
							<Select
								selected={formState.fontColor}
								options={fontColors}
								onChange={handleFontColorChange}
							/>
						</div>

						<div className={styles.section}>
							<label className={styles.label}>ЦВЕТ ФОНА</label>
							<Select
								selected={formState.backgroundColor}
								options={backgroundColors}
								onChange={handleBgColorChange}
							/>
						</div>

						<div className={styles.section}>
							<label className={styles.label}>ШИРИНА КОНТЕНТА</label>
							<Select
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
		</>
	);
};
