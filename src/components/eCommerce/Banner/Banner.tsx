
import styles from "../Banner/styles.module.css"

const {banner} = styles

export default function Banner({ title, url }: { title: string; url?: string }) {
  return (
    <div className={banner}>
      {url && <img src={url} />}
      <p>{title}</p>
    </div>
  );
}
