import Link from "next/link";

type Props = {
  classsName?: string;
};

function Logo({ classsName }: Props) {
  return (
    <Link href={"/"} className="btn btn-link no-underline">
      <h1 className={`font-bold ${classsName}`}>
        <span className="text-primary">Saas</span>
        <span className="text-primary-content">Template</span>
      </h1>
    </Link>
  );
}

export default Logo;
