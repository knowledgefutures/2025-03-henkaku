import { Handle, Position } from '@xyflow/react';

export default function WorkflowNode({ data }: { data: { label: string } }) {
	return (
		<>
			<div className="border h-16 w-56 text-sm leading-snug p-2 bg-white flex items-center justify-center text-center">
				{data.label}
			</div>
			<Handle type="target" position={Position.Top} id="a" />
			<Handle type="source" position={Position.Bottom} id="b" />
		</>
	);
}
