function DonorItem({ donor }: { donor: any }) {
  return (
    <li className="border  p-4 rounded-lg bg-gray-100">
      <p className="font-bold w-full flex justify-between">
        {donor.name}
        {' '}
        -
        {' '}
        {donor.locale}
        <span>
          {donor.amount}
          {' '}
          €
        </span>

      </p>
      {donor.message && (
      <p>
        {donor.message}
      </p>
      )}
      <p />
    </li>
  );
}

function DonorList({ donors }: { donors: any[] }) {
  return (
    <div className="mt-8">
      <ul className="space-y-4">
        {donors.map((donor) => (
          <DonorItem key={donor.id} donor={donor} />
        ))}
      </ul>
    </div>
  );
}

export default DonorList;
