import { Fragment } from 'react'
import Face from './Face'

// „Как се прави“ – картинките на стъпките една до друга.
export default function DemoStrip({ steps, active }) {
  return (
    <div className="demo-strip">
      <span className="demo-strip-title">Как се прави:</span>
      <div className="demo-strip-steps">
        {steps.map(([pose, label], i) => (
          <Fragment key={i}>
            {i > 0 && <span className="demo-strip-arrow">➜</span>}
            <figure className={`demo-step ${i === active ? 'active' : ''}`}>
              <span className="demo-step-num">{i + 1}</span>
              <Face pose={pose} size={72} />
              <figcaption>{label}</figcaption>
            </figure>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
