import styles from "./skilllevel.module.css";

export default function SkillLevel({ amount, threshold }) {
    /*
     * Basic checks before processing
     *  - amount and threshold should be numbers
     *  - should also be nonzero
     *  - amount should be less than threshold
     */
    if (threshold == null) {
        threshold = 10

    }

    if (typeof amount !== "number" || typeof threshold !== "number") {
        console.error("Expected both amount and threshold to be numbers");
    }

    if (amount <= 0 || threshold <= 0) {
        console.error("Amount and threshold should be greater than zero");
    }

    if (amount > threshold) {
        console.error("Amount should be less than or equal to threshold");
    }

    /*
     * Calculate the fill percentage
     */
    const fillAmount = (amount / threshold) * 100;

    /*
     * Render the progress bar with dynamic width based on fillAmount
     */
    return (
        <div className={styles.Wrapper}>
        <div className={styles.progressBarContainer}>
            <div 
                className={styles.progressBar} 
                style={{ width: `${fillAmount}%`}}
            />
        </div>
        <p>Experience: {amount} / {threshold}</p>
        </div>
    );
}
