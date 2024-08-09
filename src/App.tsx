import { useRef, useState } from 'react'
import { Layer, Stage, Text } from 'react-konva'

function App() {
	const [text, setText] = useState<string>('')
	const [active, setActive] = useState<boolean>(false)
	const [t, setT] = useState<boolean>(false)
	const [{ x, y }, setXY] = useState({ x: 0, y: 0 })
	const ref = useRef(null)
	console.log(ref)
	interface Event {
		clientX: number
		clientY: number
	}

	let count = 0

	const handleClick = () => {
		count++
		if (count === 2) {
			const e: Event = window.event as unknown
			setActive(false)
			setTimeout(() => {
				setXY({ x: e.clientX, y: e.clientY })
				setT(true)
			}, 10)
			count = 0
		}
	}

	window.addEventListener('keypress', e => {
		if (e.key === 'Enter') {
			setT(false)
			setActive(true)
		}
	})

	const state = {
		isDragging: false,
		x: x,
		y: y,
	}

	return (
		<div
			style={{
				backgroundImage: `url(./background.png)`,
			}}
			className='h-screen w-screen'
			onClick={handleClick}
		>
			<div style={{ cursor: 'all-scroll' }}>
				{t && (
					<input
						className='outline-none   fixed'
						type='text'
						onFocus={e => e.target.select()}
						style={{
							position: 'relative',
							fontSize: 30,
							color: 'red',
							fontWeight: 'bold',

							top: y,
							left: x,
						}}
						onClick={() => setT(true)}
						value={text}
						onChange={e => setText(e.target.value)}
					/>
				)}

				{active && (
					<Stage width={window.innerWidth} height={window.innerHeight}>
						<Layer>
							<Text
								text={text}
								fill={state.isDragging ? 'red' : 'blue'}
								fontSize={30}
								fontStyle='bold'
								ref={ref}
								width={500}
								height={500}
								draggable={true}
								onDragStart={() => (state.isDragging = true)}
								onDragEnd={() => (state.isDragging = false)}
								onDragMove={e => {
									state.x = e.target.x()
									state.y = e.target.y()
								}}
								x={state.x}
								y={state.y}
							/>
						</Layer>
					</Stage>
				)}
			</div>
		</div>
	)
}

export default App
