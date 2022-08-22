import { SparklesIcon } from '@heroicons/react/solid';

export function ThemePicker() {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-circle">
        <SparklesIcon className="w-5 h-5" />
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}
