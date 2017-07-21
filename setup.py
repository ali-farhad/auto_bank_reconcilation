import cx_Freeze

exe = [cx_Freeze.Executable("bank_recon.py")]

cx_Freeze.setup( name = "reconcile", version = "1.0", options = {"build_exe": {"packages": ["openpyxl", "glob", "sys", "time", "os"], "include_files": ['example.xlsx']}}, executables = exe )
