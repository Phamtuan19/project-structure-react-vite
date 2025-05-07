function _package_manager() {
	if [[ -f bun.lockb ]]; then
		command bun "$@"
	elif [[ -f pnpm-lock.yaml ]]; then
		command pnpm "$@"
	elif [[ -f yarn.lock ]]; then
		command yarn "$@"
	elif [[ -f package-lock.json ]]; then
		command npm "$@"
	else
		command pnpm "$@"
	fi
}

alias p='_package_manager'
alias pi='_package_manager install'
alias pa='_package_manager add'
alias pad='_package_manager add -D'
alias prm='_package_manager remove'
alias pb='_package_manager build'