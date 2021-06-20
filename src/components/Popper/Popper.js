import Tippy from '@tippyjs/react/headless'
import styles from './Popper.module.scss'

function Popper({
    children,
    delay = 0,
    minWidth = 280,
    render = () => null,
    appendTo = () => document.body,
    wrapperClassname = '',
    ...props
}) {
    return (
        <Tippy
            {...props}
            delay={delay}
            appendTo={appendTo}
            render={() => (
                <div
                    style={{ minWidth }}
                    className={[styles.wrapper, wrapperClassname].join(' ')}
                >
                    <div className={styles.inner}>
                        {render()}
                    </div>
                </div>
            )}
        >
            <div>
                {children}
            </div>
        </Tippy>
    )
}

export default Popper
