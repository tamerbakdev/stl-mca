/**
 * @type {any} Params - any props for stencil.js components
*/
interface Fragment<Params> {
  id: string;
  params?: Params;
}

interface AtomicFragment<Params> extends Fragment<Params> { }

/**
 * @description there we're restricting children types to the AtomicFragment types
*/
interface FragmentContainer<Params, ChildFragment extends AtomicFragment<Params>> extends Fragment<Params> {
  children: Array<ChildFragment>;
}

interface View<Params, ChildFragment extends AtomicFragment<Params>> extends FragmentContainer<Params, ChildFragment> {
  populate(): void;
}
