import { useState } from '@wordpress/element';
import RepeaterItemContent from './RepeaterItemContent';
import { Icon, Tooltip } from '@wordpress/components';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

const Handle = () => (
	<Tooltip text={__('Drag to Reorder', 'neve')}>
		<button
			aria-label={__('Drag to Reorder', 'neve')}
			className="nv-repeater-handle"
			onClick={(e) => {
				e.preventDefault();
			}}
		>
			<Icon icon="menu" />
		</button>
	</Tooltip>
);

const RepeaterItem = ({
	fields,
	value,
	itemIndex,
	sorting,
	onToggle,
	onContentChange,
	onRemove,
}) => {
	const [expanded, setExpanded] = useState(false);

	const arrowUp = <Icon icon="arrow-up" />;
	const arrowDown = <Icon icon="arrow-down" />;
	const visibleIcon = <Icon icon="visibility" />;
	const hiddenIcon = <Icon icon="hidden" />;
	const itemLabel = () => {
		let label = __('Item', 'neve');
		if (value[itemIndex].title) {
			label = value[itemIndex].title;
		}
		if (value[itemIndex].type) {
			label = fields.type.choices[value[itemIndex].type];
		}
		return <span className="repeater-item-title">{label}</span>;
	};

	const toggleExpand = (e) => {
		e.preventDefault();
		setExpanded(!expanded);
	};

	const visible = value[itemIndex].visibility === 'yes';
	const hasContent = value[itemIndex].hasOptions
		? value[itemIndex].hasOptions !== 'no'
		: true;

	return (
		<div className="nv-repeater-item">
			<div
				className={classnames([
					'nv-repeater-item-header',
					{ 'visibility-hidden': !visible },
				])}
			>
				<Tooltip text={__('Toggle Visibility', 'neve')}>
					<button
						aria-label={__('Toggle Visibility', 'neve')}
						className="repeater-visibility-button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onToggle(itemIndex);
						}}
					>
						{visible ? visibleIcon : hiddenIcon}
					</button>
				</Tooltip>
				{!sorting && hasContent && (
					<button
						className="nv-repeater-expand-button"
						onClick={toggleExpand}
					>
						{itemLabel()}
						{expanded ? arrowUp : arrowDown}
					</button>
				)}
				{!sorting && !hasContent && (
					<div className="nv-repeater-expand-button">
						{itemLabel()}
					</div>
				)}
				{sorting && itemLabel()}
				{sorting && <Handle />}
			</div>
			{!sorting && expanded && hasContent && (
				<RepeaterItemContent
					fields={fields}
					value={value}
					index={itemIndex}
					onContentChange={onContentChange}
					onRemove={(index) => {
						setExpanded(false);
						onRemove(index);
					}}
				/>
			)}
		</div>
	);
};

RepeaterItem.propTypes = {
	fields: PropTypes.object.isRequired,
	value: PropTypes.array.isRequired,
	itemIndex: PropTypes.number.isRequired,
	sorting: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
	onContentChange: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
};

export default RepeaterItem;
