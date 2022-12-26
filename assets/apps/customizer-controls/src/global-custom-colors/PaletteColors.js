import {
	ButtonGroup,
	Button,
	Dashicon,
	Icon,
	Modal,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { debounce } from 'lodash';
import { Accordion, ColorControl } from '@neve-wp/components';
import { useState } from '@wordpress/element';

const PaletteColors = ({ values, save }) => {
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [willDelete, setWillDelete] = useState('');
	const openDeleteModal = () => setDeleteModalOpen(true);
	const closeDeleteModal = () => setDeleteModalOpen(false);
	const addNewColor = () => {
		const nextValues = { ...values };

		const newId = newColorSlot();

		nextValues[`custom-${newId}`] = {
			label: `Custom ${newId}`,
			value: '#fff',
		};

		save(nextValues);
	};

	// Returns available slot number for new custom color (sorts slugs which starts with "custom-")
	const newColorSlot = () => {
		const customSlugs = Object.keys(values).filter((slug) => {
			return slug.substring(0, 7) === 'custom-';
		});

		const customSlugNumbers = customSlugs.map((slug) => {
			return parseInt(slug.substring(7));
		});

		customSlugNumbers.sort((a, b) => {
			return a - b;
		});

		return customSlugNumbers.at(-1) + 1;
	};

	const updateColorInPalette = (colorSlug, label, val) => {
		const nextValues = { ...values };
		if (nextValues[colorSlug].value === val) {
			return false;
		}
		nextValues[colorSlug].label = label;
		nextValues[colorSlug].value = val;
		save(nextValues);
	};

	const deleteColor = () => {
		if (!willDelete) {
			return;
		}

		const nextValues = { ...values };
		delete nextValues[willDelete];
		save(nextValues);
		closeDeleteModal();
	};

	return (
		<>
			<Accordion label={__('Custom Colors', 'neve')}>
				<div className="color-array-wrap">
					{Object.keys(values).map((slug) => {
						if (slug === 'flag') {
							return null;
						}

						return (
							<ColorControl
								disableGlobal
								key={slug}
								label={values[slug].label}
								selectedColor={values[slug].value}
								onChange={debounce((value) => {
									updateColorInPalette(
										slug,
										values[slug].label,
										value
									);
								}, 100)}
							>
								<div className="remove-custom-color-wrapper">
									<Icon
										onClick={() => {
											setWillDelete(slug);
											openDeleteModal();
										}}
										icon="trash"
									/>
								</div>
							</ColorControl>
						);
					})}
					<Button
						className="new-custom-color"
						onClick={() => {
							addNewColor();
						}}
						variant="secondary"
					>
						{__('Add Custom Color', 'neve')}
						<Dashicon icon="plus-alt2" />
					</Button>
					{isDeleteModalOpen && (
						<Modal
							onRequestClose={closeDeleteModal}
							title={__(
								'Are you sure you want to delete a Custom Color?',
								'neve'
							)}
						>
							<p>
								{__(
									'If this color is currently used anywhere on your site, it will be switched to a default color.',
									'neve'
								)}
							</p>
							<ButtonGroup className="remove-custom-color-btn-wrapper">
								<Button variant="primary" onClick={deleteColor}>
									{__('Delete', 'neve')}
								</Button>
								<Button
									variant="secondary"
									onClick={closeDeleteModal}
								>
									{__('Cancel', 'neve')}
								</Button>
							</ButtonGroup>
						</Modal>
					)}
				</div>
			</Accordion>
		</>
	);
};
export default PaletteColors;
