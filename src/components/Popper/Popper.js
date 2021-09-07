import Tippy from '@tippyjs/react/headless'
import styles from './Popper.module.scss'

function Popper({
    children,
    delay = 0,
    minWidth = 280,
    minHeight = 400,
    render = () => null,
    appendTo = () => document.body,
    wrapperClassname = '',
    onClickOutside = () => {},
    content = '',
    ...props
}) {
    return (
        <Tippy
            {...props}
            delay={delay}
            appendTo={appendTo}
            onClickOutside={onClickOutside}
            render={() => (
                <div
                    style={{ minWidth, minHeight }}
                    className={[styles.wrapper, styles.menuList, wrapperClassname].join(' ')}
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
