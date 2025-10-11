import Image from "next/image";
import classes from "./info-card.module.scss";

interface Props {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export function InfoCard({ title, description, image, alt }: Props) {
  return (
    <div className={classes.infoCard}>
      <div className={classes.imageContainer}>
        <Image src={image} alt={alt} width={0} height={0} />
      </div>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.description}>{description}</p>
    </div>
  );
}
